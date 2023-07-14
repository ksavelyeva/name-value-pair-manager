$(document).ready(function () {
    const pairs = [];
  
    // Add button click event
    $('.button--add').click(function () {
      const pairInput = $('.form__input').val();
      if (validatePair(pairInput)) {
        const pair = pairInput.trim();
        pairs.push(pair);
        addPairToList(pair);
        updatePairList();
        $('.form__input').val('');
      } else {
        alert('Invalid Name/Value pair format. Please use the format: <name> = <value>');
      }
    });
  
    // Sort by Name button click event
    $('.button--sort-name').click(function () {
      pairs.sort(sortByName);
      updateList();
    });
  
    // Sort by Value button click event
    $('.button--sort-value').click(function () {
      pairs.sort(sortByValue);
      updateList();
    });
  
    // Delete button click event
    $('.button--delete').click(function () {
      pairs.length = 0; // Clear the pairs array
      updateList();
      updatePairList();
    });
  
  
    // Show as XML button click event
    $('.button--show-xml').click(function () {
      const xml = generateXML();
      $('.xml-container').text(xml);
    });
  
    // Validate Name/Value pair format
    function validatePair(pair) {
      return /^[\w\s]+=\s*[\w\s]+$/.test(pair);
    }
  
    // Add pair to the list
    function addPairToList(pair) {
      const listItem = $('<div class="list-item"></div>');
      const checkbox = $('<input type="checkbox">').data('index', pairs.length - 1);
      const label = $('<label></label>').text(pair);
      const deleteButton = $('<button>Delete</button>');
  
      deleteButton.click(function () {
        const index = checkbox.data('index');
        pairs.splice(index, 1);
        listItem.remove();
        updatePairList();
      });
  
      listItem.append(checkbox, label, deleteButton);
      $('.list-items').append(listItem);
    }
  
    // Update the list
    function updateList() {
      $('.list-items').empty();
      pairs.forEach(function (pair, index) {
        addPairToList(pair);
      });
    }
  
    // Update the pair list
    function updatePairList() {
      const pairList = $('.pairs-list');
      pairList.empty();
      pairs.forEach(function (pair) {
        const name = pair.split('=')[0].trim();
        const value = pair.split('=')[1].trim();
        const listItem = $('<li></li>').text(name + ' = ' + value);
        pairList.append(listItem);
      });
    }
  
    // Sort the pairs by Name
    function sortByName(a, b) {
      const nameA = a.split('=')[0].trim().toLowerCase();
      const nameB = b.split('=')[0].trim().toLowerCase();
      return nameA.localeCompare(nameB);
    }
  
    // Sort the pairs by Value
    function sortByValue(a, b) {
      const valueA = a.split('=')[1].trim().toLowerCase();
      const valueB = b.split('=')[1].trim().toLowerCase();
      return valueA.localeCompare(valueB);
    }
  
    // Clear XML button click event
    $('.button--clear-xml').click(function () {
      $('.xml-container').text('');
    });
  
    // Generate XML from pairs
    function generateXML() {
      if (pairs.length === 0) {
        return '';
      }
  
      let xml = '<pairs>';
      pairs.forEach(function (pair) {
        const name = pair.split('=')[0].trim();
        const value = pair.split('=')[1].trim();
        xml += '\n  <pair>\n    <name>' + name + '</name>\n    <value>' + value + '</value>\n  </pair>';
      });
      xml += '\n</pairs>';
      return xml;
    }
  
    // Handle Enter key press in the input field
    $('.form__input--pair').keydown(function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        $('.button--add').click();
      }
    });
  });  
  