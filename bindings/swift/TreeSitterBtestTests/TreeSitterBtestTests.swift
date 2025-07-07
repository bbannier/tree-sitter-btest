import XCTest
import SwiftTreeSitter
import TreeSitterBtest

final class TreeSitterBtestTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_btest())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading BTest grammar")
    }
}
