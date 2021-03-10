#README

## Getting Started
 
```zsh
$ yarn
$ yarn start
```


## Commands

### Run

```zsh
# Run normally
$ yarn start
# Run the application with nodemon for development
$ yarn dev
```

### Test

```zsh
# Test
$ yarn test                           # Run all test
$ yarn test:unit                      # Run only unit test
$ yarn test:integration               # Run only integration test
# Test (Watch Mode for development)
$ yarn test:watch                     # Run all test with watch mode
$ yarn test:watch:unit                # Run only unit test with watch mode
$ yarn test:watch:integration         # Run only integration test with watch mode
# Test Coverage
$ yarn test:coverage                  # Calculate the coverage of all test
$ yarn test:coverage:unit             # Calculate the coverage of unit test
$ yarn test:coverage:integration      # Calculate the coverage of integration test
# Test consistent coding style (Lint)
$ yarn lint                           # Lint all sourcecode
$ yarn lint:app                       # Lint app sourcecode
$ yarn lint:test                      # Lint test sourcecode
```

### Archive

```zsh
$ yarn pack
```


## Test

All test for this boilerplate uses following tools.

- [Jest](https://github.com/facebook/jest)
- [supertest](https://github.com/visionmedia/supertest): Easy HTTP assertions for integration test

  

## License
 
 MIT
