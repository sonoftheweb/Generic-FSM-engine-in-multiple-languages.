### Generic Finite State Machine

(FSM) EngineThis project provides a generic, reusable Finite State Machine (FSM) engine written in TypeScript, with the "modulo-three" problem implemented as an example of its use.

The architecture emphasizes a strong separation of concerns, making the core FSM engine extensible and applicable to any problem that can be modeled by a finite automaton.Project Structure.
```
├── dist/                     # Compiled JavaScript output
├── node_modules/             # Project dependencies
├── src/
│   ├── core/                 # The generic, reusable FSM engine
│   │   ├── fsm.ts            # The main FiniteStateMachine class
│   │   └── types.ts          # Core TypeScript interfaces and types
│   ├── modules/                 # Specific FSM implementations
│   │   └── modThree/
│   │       ├── modThree.fsm.ts # FSM definition for the mod-three problem
│   │       └── modThree.ts     # The main modThree function implementation
│   └── main.ts               # A simple entry point to demonstrate usage
├── tests/
│   ├── core/
│   │   └── fsm.test.ts       # Unit tests for the generic FSM engine
│   └── modules/
│       └── modThree.test.ts  # Unit tests for the modThree implementation
├── jest.config.js            # Jest test runner configuration
├── package.json
├── package-lock.json
└── tsconfig.json
```

Setup and InstallationInstall Dependencies
```
npm install
```
Compile TypeScript
```
npm run build
```
### How to Run

#### Run the Demonstration
To run the example in src/main.ts, which calculates the modulo 3 for a few binary numbers
```
npm start
```
Run Unit TestsTo run all unit tests for both the core engine and the modThree example
```
npm test
```
## Design Philosophy
**Separation of Concerns:**
The core FSM logic (src/core) is completely independent of any specific implementation. It knows how to run a state machine, but nothing about what the machine does.

**Extensibility:** To solve a new FSM problem, you only need to create a new configuration file (like modThree.fsm.ts) and a corresponding implementation function. The core engine never needs to be modified.

**Type Safety:** TypeScript is used throughout the project to ensure that FSM definitions are valid and that the engine operates correctly, catching potential errors at compile time.