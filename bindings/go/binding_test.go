package tree_sitter_btest_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_btest "github.com/tree-sitter/tree-sitter-btest/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_btest.Language())
	if language == nil {
		t.Errorf("Error loading BTest grammar")
	}
}
