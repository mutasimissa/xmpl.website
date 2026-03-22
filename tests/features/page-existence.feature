Feature: All sitemap pages are accessible

  Scenario: Home page loads
    Given I navigate to "/"
    Then the page should return status 200
    And the page should have an H1

  Scenario: All sitemap pages return 200
    Given the sitemap is loaded
    When I visit each sitemap page
    Then all pages should return status 200
