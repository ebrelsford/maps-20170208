window.addEventListener('load', function() {
    var w = window, d = document, cur = 0,
        style = d.head.appendChild(d.createElement('style'));
    function go(n) { w.scrollTo(0, w.innerHeight * (cur = n) + 1); }
    function set() {
        style.innerHTML = '.slide {display:block;' +
            'height:' + window.innerHeight + 'px;}';
    }
    w.addEventListener('resize', set);
    w.addEventListener('scroll', function update(e) {
        cur = Math.floor(w.scrollY / w.innerHeight);
        if (w.location.hash !== cur) w.location.hash = cur;
        e.preventDefault();
    });
    w.addEventListener('DOMMouseScroll', function(e) {
        e.preventDefault();
    });
    d.addEventListener('keydown', function(e) {
        if (e.which === 39 || e.which === 34) {
            go(Math.min(++cur));
            e.preventDefault();
        }
        if (e.which === 37 || e.which === 33) {
            go(Math.max(0, --cur));
            e.preventDefault();
        }
    });
    function hash() {
        return Math.max(parseInt(window.location.hash.substring(1), 10), 0);
    }
    if (window.location.hash) cur = hash() || cur;
    window.onhashchange = function() { if (hash() !== cur) go(hash()); };
    set();
    go(cur);
});
