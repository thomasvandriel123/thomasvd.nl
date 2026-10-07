/* Receptmatrix: bouwt uit recepten-data.js per recept een tabel (ingrediënten links,
   bewerkingen groeien naar rechts, het gerecht staat rechts), plus ingrediënten, werkwijze en tips.
   Wijs een cel aan of tik erop om te zien wat erin gaat en waar het heen loopt. */
(function () {
  "use strict";

  var data = window.RECEPTEN;
  if (!data) return;
  var GROUPS = data.GROUPS;
  var RECIPES = data.RECIPES;

  /* ===== Boomstructuur naar tabelcellen ===== */
  function build(tree) {
    var nid = 0, leaves = [], ops = [];
    function walk(n, parent) {
      var node;
      if (typeof n === "string") {
        node = { id: "n" + (nid++), kind: "leaf", text: n, parent: parent, col: 0, first: leaves.length, last: leaves.length };
        leaves.push(node);
        return node;
      }
      node = { id: "n" + (nid++), kind: "op", op: n.op, note: n.note || "", parent: parent, children: [] };
      ops.push(node);
      node.children = n.of.map(function (c) { return walk(c, node); });
      node.first = Math.min.apply(null, node.children.map(function (c) { return c.first; }));
      node.last = Math.max.apply(null, node.children.map(function (c) { return c.last; }));
      node.col = 1 + Math.max.apply(null, node.children.map(function (c) { return c.col; }));
      return node;
    }
    var root = walk(tree, null);
    ops.forEach(function (o) {
      o.rowspan = o.last - o.first + 1;
      o.colspan = (o.parent ? o.parent.col : root.col + 1) - o.col;
      o.isRoot = !o.parent;
    });
    return { root: root, leaves: leaves, ops: ops, maxCol: root.col };
  }

  function rowsOf(m) {
    var rows = [];
    m.leaves.forEach(function (leaf, r) {
      var cells = [{ type: "leaf", node: leaf }];
      var p = leaf.parent.col;
      if (p > 1) cells.push({ type: "gap", node: leaf, colspan: p - 1 });
      m.ops.filter(function (o) { return o.first === r; })
        .sort(function (a, b) { return a.col - b.col; })
        .forEach(function (o) { cells.push({ type: "op", node: o, rowspan: o.rowspan, colspan: o.colspan }); });
      rows.push(cells);
    });
    return rows;
  }

  function leafTexts(tree) {
    var out = [];
    (function w(n) { if (typeof n === "string") { out.push(n); } else { n.of.forEach(w); } })(tree);
    return out;
  }

  /* ===== Weergave ===== */
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  var QTY = /^((?:ca\.\s*|[±~]\s*)?[\d½¼¾][\d½¼¾.,\/–-]*(?:\s*(?:g|kg|ml|l|el|tl|tenen|teen|stengels|stengel|st|blik|shots|cm))?)(?=\s|$)/i;
  function fmt(text) {
    var m = QTY.exec(text);
    if (!m) return esc(text);
    return '<b class="q">' + esc(m[1]) + "</b>" + esc(text.slice(m[1].length));
  }

  function matrixHTML(rows) {
    var h = '<div class="mxwrap"><table class="mx"><tbody>';
    rows.forEach(function (cells) {
      h += "<tr>";
      cells.forEach(function (c) {
        var n = c.node;
        if (c.type === "leaf") {
          h += '<th class="ing" scope="row" tabindex="0" data-id="' + n.id + '">' + fmt(n.text) + "</th>";
        } else if (c.type === "gap") {
          h += '<td class="gap" colspan="' + c.colspan + '" data-id="' + n.id + '"></td>';
        } else {
          h += '<td class="op' + (n.isRoot ? " root" : "") + '" tabindex="0" rowspan="' + c.rowspan + '" colspan="' + c.colspan + '" data-id="' + n.id + '">' +
            '<span class="name">' + esc(n.op) + "</span>" + (n.note ? '<span class="note">' + esc(n.note) + "</span>" : "") + "</td>";
        }
      });
      h += "</tr>";
    });
    return h + "</tbody></table></div>";
  }

  function ingredientsHTML(r) {
    var groups = r.ingr || [{ h: "", items: leafTexts(r.tree) }];
    var h = '<div class="ig">';
    groups.forEach(function (g) {
      if (g.h) h += "<h4>" + esc(g.h) + "</h4>";
      h += "<ul>";
      g.items.forEach(function (it) {
        if (typeof it === "string") h += '<li><span class="n">' + fmt(it) + "</span></li>";
        else h += '<li><span class="n">' + esc(it[0]) + '</span><span class="a">' + esc(it[1]) + "</span></li>";
      });
      h += "</ul>";
    });
    return h + "</div>";
  }

  function methodHTML(r) {
    var h = '<ol class="steps">';
    r.method.forEach(function (s) {
      h += "<li><div>" + (s.k ? '<span class="k">' + esc(s.k) + "</span>" : "") + (s.h ? "<b>" + esc(s.h) + "</b> " : "") + esc(s.t) + "</div></li>";
    });
    return h + "</ol>";
  }

  function recipeHTML(r) {
    var h = '<section class="recipe" id="' + r.id + '" aria-labelledby="h-' + r.id + '">';
    h += '<div class="rh"><p class="label">' + esc(GROUPS[r.group]) + '</p><a class="link label" href="#toc">Naar inhoud</a></div>';
    h += '<h2 class="rt heading" id="h-' + r.id + '">' + esc(r.title) + "</h2>";
    if (r.intro) h += '<p class="intro">' + esc(r.intro) + "</p>";
    h += '<p class="meta">' + r.meta.map(esc).join(" &middot; ") + "</p>";
    h += '<h3 class="sh">Matrix</h3>' + matrixHTML(rowsOf(build(r.tree)));
    h += '<div class="cols"><div><h3 class="sh">Ingrediënten</h3>' + ingredientsHTML(r) + "</div>";
    if (r.method) {
      h += '<div><h3 class="sh">' + esc(r.methodTitle || "Werkwijze") + "</h3>" + methodHTML(r) + "</div>";
    } else {
      h += "<div></div>";
    }
    h += "</div>";
    if (r.tips) {
      h += '<div class="tips"><h3 class="sh">Tips en opmerkingen</h3><dl>' +
        r.tips.map(function (t) { return "<div><dt>" + esc(t.h) + "</dt><dd>" + esc(t.t) + "</dd></div>"; }).join("") + "</dl></div>";
    }
    return h + "</section>";
  }

  function tocHTML() {
    var h = '<h2 class="label">Inhoud</h2><div class="toc-groups">';
    GROUPS.forEach(function (g, gi) {
      var items = RECIPES.filter(function (r) { return r.group === gi; });
      if (!items.length) return;
      h += '<div class="tg"><h3>' + esc(g) + "</h3><ul>" + items.map(function (r) {
        return '<li><a href="#' + r.id + '" data-t="' + r.id + '"><span class="t">' + esc(r.title) + '</span><span class="s">' + esc(r.sub) + "</span></a></li>";
      }).join("") + "</ul></div>";
    });
    return h + "</div>";
  }

  /* Hover- en tikspoor per matrix: wat gaat erin, waar gaat het heen */
  function setupMatrix(table, m) {
    var byId = {};
    m.leaves.concat(m.ops).forEach(function (n) { byId[n.id] = n; });
    function up(id) { var s = {}, p = byId[id].parent; while (p) { s[p.id] = 1; p = p.parent; } return s; }
    function down(id) { var s = {}; (function w(n) { if (n.children) n.children.forEach(function (c) { s[c.id] = 1; w(c); }); })(byId[id]); return s; }
    var cells = [].slice.call(table.querySelectorAll("[data-id]"));
    var pinned = null;
    function trace(id) {
      var ins = down(id), outs = up(id);
      table.classList.add("tracing");
      cells.forEach(function (c) {
        var i = c.getAttribute("data-id");
        c.classList.toggle("t-self", i === id);
        c.classList.toggle("t-in", !!ins[i]);
        c.classList.toggle("t-out", !!outs[i]);
      });
    }
    function clear() {
      table.classList.remove("tracing");
      cells.forEach(function (c) { c.classList.remove("t-self", "t-in", "t-out"); });
    }
    function idOf(e) { var c = e.target.closest && e.target.closest("[data-id]"); return c ? c.getAttribute("data-id") : null; }
    table.addEventListener("mouseover", function (e) { if (pinned) return; var i = idOf(e); if (i) trace(i); });
    table.addEventListener("mouseleave", function () { if (!pinned) clear(); });
    table.addEventListener("focusin", function (e) { if (pinned) return; var i = idOf(e); if (i) trace(i); });
    table.addEventListener("focusout", function () { if (!pinned) clear(); });
    table.addEventListener("click", function (e) {
      var i = idOf(e);
      if (!i) return;
      if (pinned === i) { pinned = null; clear(); } else { pinned = i; trace(i); }
    });
    document.addEventListener("click", function (e) {
      if (pinned && !table.contains(e.target)) { pinned = null; clear(); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && pinned) { pinned = null; clear(); }
    });
  }

  document.getElementById("toc").innerHTML = tocHTML();
  document.getElementById("recipes").innerHTML = RECIPES.map(recipeHTML).join("");
  [].slice.call(document.querySelectorAll(".recipe")).forEach(function (sec, i) {
    setupMatrix(sec.querySelector(".mx"), build(RECIPES[i].tree));
  });

  /* Markeer in de inhoudsopgave het recept dat in beeld is */
  try {
    var links = {};
    [].slice.call(document.querySelectorAll(".toc a[data-t]")).forEach(function (a) { links[a.getAttribute("data-t")] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].removeAttribute("aria-current"); });
          var l = links[en.target.id];
          if (l) l.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-15% 0px -75% 0px" });
    [].slice.call(document.querySelectorAll(".recipe")).forEach(function (s) { io.observe(s); });
  } catch (_) { /* zonder IntersectionObserver blijft de inhoudsopgave gewoon werken */ }
})();
