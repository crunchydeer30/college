(module
  (import "console" "log" (func $log (param i32)))
  (memory (export "memory") 1)
  (data (i32.const 0) "HelloWorld\00")

  (func (export "get_string_pointer") (result i32)
    (i32.const 0)
  )

  (func (export "get_string_length") (result i32)
    (i32.const 11)
  )

  (func (export "replace") (param $index i32) (param $char i32)
    (i32.store8 (local.get $index) (local.get $char))
  )

  (func (export "idxOf") (param $char i32) (result i32)
    (local $i i32)
    (local $len i32)
    (local.set $i (i32.const 0))
    (local.set $len (i32.const 11))

    (loop $loop
      (if (i32.eq (i32.load8_u (local.get $i)) (local.get $char))
        (then
          (return (local.get $i))
        )
      )
      
      (local.set $i (i32.add (local.get $i) (i32.const 1)))
      (br_if $loop (i32.lt_s (local.get $i) (local.get $len)))
    )

    (i32.const -1)
  )
)