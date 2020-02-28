const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function() {
    // Get UI selectors from UI Module
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable submit on enter
    document.addEventListener('keypress', e => {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Item update submit
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Item delete event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // Clear items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);

    // Back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
  };

  // Add item submit
  const itemAddSubmit = function(e) {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if (input.name.length && input.calories.length) {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Store in localStorage
      StorageCtrl.storeItem(newItem);

      // Clear fields
      UICtrl.clearInputFields();
    }

    e.preventDefault();
  };

  // Click edit item
  const itemEditClick = function(e) {
    if (e.target.classList.contains('edit-item')) {
      // Get list item id (item-0, item-1, etc.)
      const id = +e.target.parentNode.parentNode.id.split('-')[1];
      const itemToEdit = ItemCtrl.getItemById(id);
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  };

  // Update item submit
  const itemUpdateSubmit = function(e) {
    // Get item input
    const input = UICtrl.getItemInput();

    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    UICtrl.updateListItem(updatedItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Update local storage
    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  // Delete button event
  const itemDeleteSubmit = function(e) {
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // Remove from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Delete from local storage
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  // Clear items event
  const clearAllItemsClick = function() {
    // Delete all items from data structure
    ItemCtrl.clearAllItems();

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Remove items from UI
    UICtrl.removeItems();

    // CLear from local storage
    StorageCtrl.clearItemsFromStorage();

    // Hide the ul
    UICtrl.hideList();
  };

  // Public methods
  return {
    init: function() {
      // Clear edit state / set initial state
      UICtrl.clearEditState();

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if (!items.length) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init();
