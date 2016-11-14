# Custom ACE Modes

Peg.js syntax highlighting comes from [this repo by kwesibrunee](https://github.com/kwesibrunee/ace/blob/master/lib/ace/mode/pegjs/peg-0.9.0.js).

I brought it into this repo with help from two tools:

* [**ACE build scripts:**](https://github.com/kwesibrunee/ace/blob/master/Makefile.dryice.js) used to create the [ace-builds repo](https://github.com/ajaxorg/ace-builds).
* [**Brace:**](https://github.com/thlorenz/brace) packages ACE nicely for use with Webpack. [This script](https://github.com/thlorenz/brace/blob/master/build/update.js) takes the stuff from ace-builds and makes it work with Webpack.

tl;dr for getting Peg.js syntax working:

* Download the kwesibrunee/ace repo and cd into it
* In kwesibrunee/ace:
  * `npm install`
  * `node Makefile.dryice.js` to build the modified `ace-builds` with peg.js support
* Download the brace repo
* Copy `kwesibrunee/ace/build/src` into `brace/build/ace-build/src`
* In brace:
  * Modify `build/update.js` so it doesn't git clone/checkout
  * Run `build/update.js`
  * Strip anything that refers to workers from `pegjs.js` – the worker included in pegjs.js in kwesibrunee/ace does NOT work
  * Copy `mode/pegjs.js` to this project under `src/vendor/ace_modes`

Email me if you're having trouble, it's terribly confusing: [matt@mplewis.com](mailto:matt@mplewis.com)
