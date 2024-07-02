Feature: Todo List

Scenario: Add an item to the todo list
  Given I am on the todo list page
  When I enter "Buy milk" into the input field
  And I click the "ADD" button
  Then I should see "Buy milk" in the todo list

Scenario: Delete an item from the todo list
  Given I am on the todo list page
  And I have an item "Buy milk" in the todo list
  When I click the "Delete" button next to "Buy milk"
  Then I should not see "Buy milk" in the todo list

Scenario: Edit an item in the todo list
  Given I am on the todo list page
  And I have an item "Buy milk" in the todo list
  When I click the "Edit" button next to "Buy milk"
  And I change it to "Buy bread"
  Then I should see "Buy bread" in the todo list
  And I should not see "Buy milk" in the todo list

Scenario: Add a duplicate item to the todo list
  Given I am on the todo list page
  When I enter "Buy milk" into the input field
  And I click the "ADD" button
  Then I should see "Buy milk" in the todo list
  When I enter "Buy milk" into the input field
  And I click the "ADD" button
  Then I should see an alert with message "Task already exists!"
  And I should still see only one "Buy milk" in the todo list

Scenario: Edit an item to a duplicate in the todo list
  Given I am on the todo list page
  When I enter "Buy milk" into the input field
  And I click the "ADD" button
  Then I should see "Buy milk" in the todo list
  When I enter "Buy bread" into the input field
  And I click the "ADD" button
  Then I should see "Buy bread" in the todo list
  When I click the "Edit" button next to "Buy bread"
  And I change it to "Buy milk"
  Then I should see an alert with message "Task already exists!"
  And I should still see "Buy bread" in the todo list
  And I should still see only one "Buy milk" in the todo list

