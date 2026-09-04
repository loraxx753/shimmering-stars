Feature: SignIn

  Any Meanwhile app can use the same SignIn component.
  Providers are named instances. The app fills config/auth.yaml.
  onProviderSelect is the stateful OAuth remainder.

  Scenario: default google and github
    Given a SignIn
    Then the "providers" is "google, github"
    And the "title" is "Sign in"

  Scenario: continue with google
    Given a SignIn
    When the user clicks "Continue with Google"
    Then onProviderSelect is called with "google"

  Scenario: continue with github
    Given a SignIn
    When the user clicks "Continue with GitHub"
    Then onProviderSelect is called with "github"

  Scenario: wix equivalent
    Given a SignIn
    When it has providers "google, github, apple, facebook, microsoft, email"
    Then the "label" for "google" is "Continue with Google"
    And the "label" for "github" is "Continue with GitHub"
    And the "label" for "apple" is "Continue with Apple"
    And the "label" for "facebook" is "Continue with Facebook"
    And the "label" for "microsoft" is "Continue with Microsoft"
    And the "label" for "email" is "Continue with email"
