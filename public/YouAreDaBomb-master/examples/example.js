// Generated by CoffeeScript 1.4.0
(function() {
  var A, a;

  A = (function() {

    function A() {}

    A.prototype.bar = function() {
      return alert("bar");
    };

    return A;

  })();

  a = new A();

  Before(a, 'bar', function() {
    return alert("foo");
  });

  a.bar();

}).call(this);