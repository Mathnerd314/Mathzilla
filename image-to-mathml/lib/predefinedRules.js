/* -*- Mode: Java; tab-width: 2; indent-tabs-mode:nil; c-basic-offset: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

var _ = require("sdk/l10n").get;

exports.predefinedScripts = {
  "LaTeX_NoDelimiters": {
    ScriptOptions: {
      selectorsInline: {
        type: "string",
        value: ""
      },
      selectorsInlineDisplayStyle: {
        type: "string",
        value: "img"
      },
      selectorsDisplay: {
        type: "string",
        value: ""
      },
      preloadList: {
        type: "string",
        value: ""
      }
    }
  },
  "LaTeX_Delimiters": {
    ScriptOptions: {
      selectors: {
        type: "string",
        value: "img"
      },
      useDisplayAttribute: {
        type: "bool",
        value: true
      },
      preloadList: {
        type: "string",
        value: ""
      }
    }
  }
}

// Add localized members to the predefined scripts.
exports.localizePredefinedScripts = function() {
  for (var script in exports.predefinedScripts) {
    exports.predefinedScripts[script].title = _(script + "_title");
    exports.predefinedScripts[script].description = _(script + "_description");
    for (var option in exports.predefinedScripts[script].ScriptOptions) {
      exports.predefinedScripts[script].ScriptOptions[option].title =
        _(script + "_option_" + option + "_title");
      exports.predefinedScripts[script].ScriptOptions[option].description =
        _(script + "_option_" + option + "_description");
    }
  }
};

////////////////////////////////////////////////////////////////////////////////
exports.predefinedRules = [
  {
    // WordPress LaTeX plugin
    // See http://en.support.wordpress.com/latex/
    Script: "LaTeX_NoDelimiters",
    ScriptOptions: {
      selectorsInlineDisplayStyle: "img.latex"
    },
    URLPatternList: [
      "http://en.support.wordpress.com/latex/",
      "https://collegemathteaching.wordpress.com/*"
    ]
  },
  {
    // Images generated by texvc.
    // See https://www.mediawiki.org/wiki/Texvc
    Script: "LaTeX_NoDelimiters",
    ScriptOptions: {
      selectorsInlineDisplayStyle: "img.tex",
      preloadList: "texvc"
    },
    URLPatternList: [
      "*.wikipedia.org",
      "http://en.academic.ru/dic.nsf/enwiki/*"
    ]
  },
  {
    // Images generated by gladTeX.
    Script: "LaTeX_NoDelimiters",
    ScriptOptions: {
      selectorsInline: ".inline_eqn > img",
      selectorsInlineDisplayStyle: ".display_eqn > img"
    },
    URLPatternList: "http://myphysicslab.com/*"
  },
  {
    // Spip
    // See http://www.spip.net/en_article3563.html
    Script: "LaTeX_NoDelimiters",
    ScriptOptions: {
      selectorsInlineDisplayStyle: ".spip img"
    },
    URLPatternList: "http://www.spip.net/*"
  },
  {
    Script: "LaTeX_Delimiters",
    URLPatternList: "http://www.les-mathematiques.net/*"
  }
];

// Transform exports.predefinedRules into a canonical form.
for (var i = 0; i < exports.predefinedRules.length; i++) {

  // Make URLPatternList an array.
  var patternList = exports.predefinedRules[i].URLPatternList;
  if (typeof patternList === "string") {
    exports.predefinedRules[i].URLPatternList = [patternList];
  }

  // Use the default option values if they are not specified.
  if (!exports.predefinedRules[i].ScriptOptions) {
    exports.predefinedRules[i].ScriptOptions = {};
  }
  var script = exports.predefinedRules[i].Script;
  var options = exports.predefinedScripts[script].ScriptOptions;
  for (var option in options) {
    if (!exports.predefinedRules[i].ScriptOptions.hasOwnProperty(option)) {
      exports.predefinedRules[i].ScriptOptions[option] = options[option].value;
    }
  }
}
