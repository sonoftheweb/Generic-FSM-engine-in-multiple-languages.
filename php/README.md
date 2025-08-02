## Finite State Machine Engine in Laravel (DDD & SOLID)

This project implements a generic, reusable Finite State Machine (FSM) engine within a Laravel application. It solves the "modulo-three" problem as a practical example, but is architected using principles from Domain-Driven Design (DDD) and SOLID to be highly extensible, maintainable, and testable.

The system is accessible via two different delivery mechanisms:

-   A Web Interface (HTTP Controller)
-   A CLI Interface (Artisan Command)

### Architectural Approach

This project is intentionally structured into distinct layers to achieve a clean separation of concerns. This is a simplified take on Clean/Hexagonal Architecture.

```
+-----------------------------------------------------------------+

|                        Infrastructure Layer                     |
|  +------------------+   +------------------+   +--------------+ |
|  | ModThreeController |   | FsmModThreeCommand |   | FsmServiceProvider| |
|  +------------------+   +------------------+   +--------------+ |
+-----------+------------------+------------------+----------------+
            |                  |                  |
            v                  v                  v
+-----------+------------------+------------------+----------------+
|                        Application Layer                        |
|                  +-----------------------+                      |
|                  |   CalculateModThree   | (Use Case)           |
|                  +-----------+-----------+                      |
|                              |                                  |
|                              v (depends on interface)           |
|                  +-----------------------+                      |
|                  | ModThreeFsmFactoryInterface | (Port)         |
|                  +-----------------------+                      |
+------------------------------+----------------------------------+
                               |
                               v (implemented by Infrastructure)
+------------------------------+----------------------------------+
|                          Domain Layer                           |
|      +---------------------+   +--------------------------+     |
|      | FiniteStateMachine  |   | State, TransitionRules   |     |
|      | (Aggregate Root)    |   | (Value Objects)          |     |
|      +---------------------+   +--------------------------+     |
+-----------------------------------------------------------------+
```

**Domain Layer:** Contains the core business logic and rules. The FiniteStateMachine is a rich domain entity that knows how to run a simulation but is completely unaware of Laravel, databases, or HTTP.

**Application Layer:** Orchestrates the domain layer. It defines specific use cases (e.g., CalculateModThree) that are triggered by the outside world. This layer is also independent of the delivery mechanism.

**Infrastructure Layer:** The outermost layer. This is where Laravel-specific components live, such as Controllers, Artisan Commands, Service Providers, and Factories. This layer's job is to adapt incoming requests (from HTTP or CLI) and trigger the appropriate application service.

### Setup and Installation
- Clone & Install Dependencies:
```bash
git clone https://github.com/sonoftheweb/generic-FSM-engine.git 
cd generic-FSM-engine/php
```

Environment File:
```bash
cp .env.example .env

# Install Dependencies (requires docker)
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php84-composer:latest \
    composer install --ignore-platform-reqs

vendor/bin/sail artisan key:generate

vendor/bin/sail up -d
```

How to Use
You can interact with the FSM engine in two ways:
- **Web Interface**
Start the local development server:
```
vendor/bin/sail artisan serve
```

Then, navigate to the following URL in your browser to see a table of pre-calculated results:http://localhost/mod-three. 

- **Artisan Command Line Interface**
Run the command from your terminal, providing a binary string as an argument.
```
vendor/bin/sail artisan fsm:mod-three {binaryString}
```

Examples:
#### Calculate 1101 (13) mod 3
vendor/bin/sail artisan fsm:mod-three 1101

#### Calculate 1111 (15) mod 3
vendor/bin/sail artisan fsm:mod-three 1111

#### See error handling for invalid input
```
vendor/bin/sail artisan fsm:mod-three 10210
```
    
### Running Tests
The project includes a comprehensive test suite covering all layers of the architecture. To run all tests:
```
vendor/bin/sail artisan test
```
The tests are organized as follows:
- tests/Unit/Domain: Tests the core business logic of the FiniteStateMachine entity in complete isolation.
- tests/Unit/Application: Tests the CalculateModThree use case, mocking its dependencies to ensure it correctly orchestrates the domain layer.
- tests/Feature: Tests the full application flow from the HTTP route to the final response, ensuring all layers are wired together correctly.
