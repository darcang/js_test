const tableSize = 10;

window.onload = function(){
  $('#save').on('click', function(){
    localStorage.setItem(sheetName(), JSON.stringify(storageData))
  });

  $('#load').on('click', function(){
    storageData = JSON.parse(localStorage.getItem(sheetName()));
    if (storageData == null) {
      alert(sheetName() + ' not found')
    }
    else{
      computeAll();
    }
  });

  function sheetName(){
    return document.getElementById('input-field').value;
  }

  (function buildTable(){
    for (var i = 0; i < tableSize; i++) {
      var row = document.querySelector('table').insertRow(-1);
      for (var j = 0; j < tableSize; j++) {
        var letter = String.fromCharCode('A'.charCodeAt(0) + j - 1);
        row.insertCell(-1).innerHTML = i && j ? "<input id='"+ letter+i +"'/>" : i || letter;
      }
    }
  })();

  var storageData = {};
  var computedData = {};
  INPUTS = [].slice.call(document.querySelectorAll('td input'));
  INPUTS.forEach(function(elm) {
    elm.onblur = function(e) {
      var id = e.target.id;
      var value = e.target.value;
        storageData[id] = value;
    };

    var getter = function() {
      var value = storageData[elm.id] || '';
      if (value.charAt(0) == '=') {
        with (computedData) return eval(value.substring(1));
      } else { return isNaN(parseFloat(value)) ? value : parseFloat(value); }
    };

    Object.defineProperty(computedData, elm.id, { get:getter });
    Object.defineProperty(computedData, elm.id.toLowerCase(), { get:getter });
  });

  (window.computeAll = function() {
    INPUTS.forEach(function(elm) { try { elm.value = computedData[elm.id]; } catch(e) {} });
  })();
}