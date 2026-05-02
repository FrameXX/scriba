export const DEFAULT_SOURCE_CODE = `= AsciiDoc Syntax Reference
:toc:

== Text Formatting

This is a paragraph with *bold text*, _italic text_, and \`monospaced code\`.
You can also use #highlighted text# or [.underline]#underlined text#.

Links are easy: https://asciidoc.org[AsciiDoc Home].

== Lists

.Unordered List
* Level 1
** Level 2
*** Level 3

.Ordered List
. First item
. Second item
.. Sub-item A
.. Sub-item B

== Blocks and Code

[source,python]
----
def hello_world():
    print("Hello, AsciiDoc!")
----

[NOTE]
====
This is an admonition block used to grab attention.
====

== Tables

[cols="1,1,2", options="header"]
|===
| Feature | Status | Notes
| Inline Math | Ready | Tested below
| Tables | Ready | Recursive parsing is fun
| Images | Pending | Path resolution required
|===

== Mathematical Expressions

Asciidoctor supports math via the \`stem\` (Science, Technology, Engineering, and Math) attribute.

=== Inline Math
The following expression is rendered inline: stem:[E = mc^2]. You can also use more complex notation like stem:[\sqrt{a^2 + b^2} = c].

=== Display Math
For standalone equations, use the block syntax:

[stem]
++++
f(x) = \\int_{-\\infty}^{\\infty} \\hat{f}(\\xi) e^{2\\pi i \\xi x} d\\xi
++++

Another example using a matrix:

[stem]
++++
\\mathbf{A} = \\begin{vmatrix}
a & b \\\\
c & d
\\end{vmatrix}
++++

== Delimiters Test

---

* Hard line breaks are indicated by a space followed by a plus sign +
This is on a new line.

////
This is a multiline comment.
It should not appear in the output.
////
`;
