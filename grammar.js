/**
 * @file Btest grammar for tree-sitter
 * @author Benjamin Bannier <bbannier@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const not_eol = /[^\r\n\u2028\u2029]*/;

module.exports = grammar({
  name: "btest",

  extras: $ => [/[\s\f\uFEFF\u2060\u200B]|\\\r?\n/, $.comment],
  externals: $ => [$.literal_file, $.error_sentinel],

  rules: {
    source_file: $ =>
      repeat(
        choice(
          $.alternative,
          $.copy_file,
          $.doc,
          $.exec,
          $.exec_fail,
          $.group,
          $.ignore,
          $.measure_time,
          $.not_alternative,
          $.port,
          $.requires,
          $.serialize,
          $.start_next,
          // $.start_end_file,
          $.start_file,
          $.end_file,
        ),
      ),

    alternative: $ => seq("@TEST-ALTERNATIVE:", $.string),
    copy_file: $ => seq("@TEST-COPY-FILE:", $.string),
    doc: $ => seq("@TEST-DOC:", $.string),
    exec: $ => seq("@TEST-EXEC:", $.sh),
    exec_fail: $ => seq("@TEST-EXEC-FAIL:", $.sh),
    group: $ => seq("@TEST-GROUP:", $.string),
    ignore: _ => "@TEST-IGNORE",
    measure_time: _ => "@TEST-MEASURE_TIME",
    not_alternative: $ => seq("@TEST-NOT-ALTERNATIVE:", $.string),
    port: $ => seq("@TEST-PORT:", $.number),
    requires: $ => seq("@TEST-REQUIRES:", $.sh),
    serialize: $ => seq("@TEST-SERIALIZE:", $.string),
    start_next: $ => seq("@TEST-START-NEXT", $.string),

    // TODO(bbannier): Ideally we would extract the document as well, but this
    // is hard since BTest macros usually appear in comments, but the file is
    // literal.
    // start_end_file: $ => seq("@TEST-START-FILE", $.string, $.literal_file, "@TEST-END-FILE"),
    start_file: $ => seq("@TEST-START-FILE", $.string),
    end_file: _ => "@TEST-END-FILE",

    sh: _ => not_eol,
    number: _ => /[0-9]+/,
    string: _ => not_eol,
    ext: $ => $.string,
    comment: _ => /#[^\r\n]*/,
  },
});
