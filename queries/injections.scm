(exec
  (sh) @injection.content
  (#set! injection.language "sh")
)

(exec_fail
  (sh) @injection.content
  (#set! injection.language "sh")
)

; (start_end_file
;   (literal_file) @injection.content
;   (#set! injection.language "sh")
; )
