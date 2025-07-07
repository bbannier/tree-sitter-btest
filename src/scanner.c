#include "tree_sitter/alloc.h"
#include "tree_sitter/array.h"
#include "tree_sitter/parser.h"
#include <_abort.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>
#include <wctype.h>

enum TokenType {
  LITERAL_FILE,
  ERROR_SENTINEL,
};

void *tree_sitter_btest_external_scanner_create() { return NULL; }

void tree_sitter_btest_external_scanner_destroy(void *payload) {
  (void)payload;
}

unsigned tree_sitter_btest_external_scanner_serialize(void *payload,
                                                      char *buffer) {
  (void)payload;
  (void)buffer;
  return 0;
}

void tree_sitter_btest_external_scanner_deserialize(void *payload,
                                                    const char *buffer,
                                                    unsigned length) {
  (void)payload;
  (void)buffer;
  (void)length;
}

bool tree_sitter_btest_external_scanner_scan(void *payload, TSLexer *lexer,
                                             const bool *valid_symbols) {
  (void)payload;

  if (valid_symbols[ERROR_SENTINEL])
    return false;

  const char *end = "@TEST-END-FILE";

  if (valid_symbols[LITERAL_FILE]) {
    while (iswspace(lexer->lookahead)) {
      lexer->advance(lexer, true);
    }

    lexer->result_symbol = LITERAL_FILE;

  lookahead:
    while (!lexer->eof(lexer) && lexer->lookahead != '@') {
      lexer->advance(lexer, false);
      lexer->mark_end(lexer);
    }

    if (lexer->lookahead == '@') {
      for (size_t i = 0; i < strlen(end); ++i) {
        if (lexer->lookahead != end[i])
          goto lookahead;

        lexer->advance(lexer, false);
      }
    }

    return true;
  }

  return false;
}
