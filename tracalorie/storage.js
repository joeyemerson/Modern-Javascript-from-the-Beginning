const StorageCtrl = (function() {
  // Public Methods
  return {
    storeItem: function(item) {
      let items;
      if (!localStorage.getItem('items')) {
        items = [];
        items.push(item);
      } else {
        items = JSON.parse(localStorage.getItem('items'));
        items.push(item);
      }
      localStorage.setItem('items', JSON.stringify(items));
    },
    getItemsFromStorage: function() {
      let items;
      if (!localStorage.getItem('items')) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach((item, index) => {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStorage: function(id) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach((item, index) => {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage: function() {
      localStorage.removeItem('items');
    }
  };
})();
