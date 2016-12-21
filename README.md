# [Pegboard IDE](https://pegboard.js.org/)

Design, parse, and interpret a programming language in your browser. Head to [pegboard.js.org](https://pegboard.js.org/) to try it out.

From left to right, here's how you use the panes of the IDE:

1. **Grammar:** Write a grammar to generate a parser.
2. **Program:** Write a program to parse. See if your grammar worked properly. Generate an abstract syntax tree.
3. **Interpreter:** Write an interpreter for your AST. Interpret your code. See if the output is what you wanted.

# Why did you build this?

I'm a programming language nerd. I learned a lot from trying to build a proglang from the ground up. Lexing, parsing, interpreting, and compiling each teach you about the limitations of a language and the tooling around it.

I was disappointed to see that the lexer/parser/generator tooling out there is either really old, really arcane, or really undocumented:

* Some grammars use tons of symbols and are extremely arcane
* Some grammars are hard to use because they don't tolerate ambiguity or handle it in non-intuitive ways
* Some tools don't play nice with modern scripting languages
* Some tools need a buildchain just to get to Hello World
* Most tools don't have a fast REPL that helps you catch mistakes quickly
* Some parser generators are written in modern languages and have been abandoned
* All of this is really arcane knowledge unless you've taken a compilers course (I haven't)

All of the above factors contribute to make learning how to create a programming language extremely difficult for newbies. So I picked an opinionated set of tools and put them in one place:

* **[PEG.js](https://pegjs.org/):** A really, really nice parser that uses [parsing expression grammar](http://en.wikipedia.org/wiki/Parsing_expression_grammar). In practice, it's less of a pain in the ass than LL(k) and LR(k) parser generators.
* **JavaScript:** You'll write your interpreter with whatever version of JS is in your browser. JS isn't perfect, but it's tolerable.
* **Interface:** A really basic IDE with inputs and outputs. Do stuff quickly, get results quickly.

Hope you like it. Let me know what you'd like to see.

# Run Locally

```sh
# Install dependencies
npm install

# Live server at http://localhost:8080/webpack-dev-server
npm run serve

# Build to dist/ for development
webpack

# Build to dist/ for production
webpack --config webpack.prod.config.js

# Deploy to GitHub Pages
gulp
```

# License

MIT
