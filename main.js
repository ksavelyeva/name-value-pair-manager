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


  // Delete button click event
  $('.button--delete').click(function () {
    const checkedItems = $('.list-item input[type="checkbox"]:checked');
    checkedItems.each(function () {
      const index = $(this).data('index');
      pairs.splice(index, 1);
    });
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

  // Helper function to get the name from a pair
  const getName = (pair) => pair.split('=')[0].trim();

  // Helper function to get the value from a pair
  const getValue = (pair) => pair.split('=')[1].trim();

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
      const name = getName(pair);
      const value = getValue(pair);
      const listItem = $('<li></li>').text(name + ' = ' + value);
      pairList.append(listItem);
    });
  }

  // Sort the pairs by Name
  function sortByName(a, b) {
    const nameA = getName(a).toLowerCase();
    const nameB = getName(b).toLowerCase();
    return nameA.localeCompare(nameB);
  }

  // Sort the pairs by Value
  function sortByValue(a, b) {
    const valueA = getValue(a).toLowerCase();
    const valueB = getValue(b).toLowerCase();
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
      const name = getName(pair);
      const value = getValue(pair);
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
