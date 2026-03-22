Feature: SEO compliance

  Scenario: Home page has OG meta tags
    Given I navigate to "/"
    Then the page should have an og:title tag
    And the page should have an og:description tag
    And the page should have an og:url tag
    And the page should have a canonical URL

  Scenario: Home page has JSON-LD
    Given I navigate to "/"
    Then the page should have JSON-LD structured data
