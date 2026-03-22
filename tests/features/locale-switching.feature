Feature: Locale switching

  Scenario: Default locale loads
    Given the site has multiple locales
    When I navigate to "/"
    Then the page should return status 200

  Scenario: Alternate locale routes exist
    Given the site has multiple locales
    Then each non-default locale route should return 200

  Scenario: Hreflang tags are present
    Given the site has multiple locales
    When I navigate to "/"
    Then hreflang tags should exist for all locales
