(module
  (import "console" "log" (func $log (param i32)))
  (memory (export "memory") 1)
  (data (i32.const 0) "\01\FF\AB\CD")

  (func $get_len (export "get_len") (result i32)
    (local $i i32)

    (loop $loop
      (local.set $i (i32.add (local.get $i) (i32.const 1)))
      (br_if $loop (i32.ne (i32.load8_u (local.get $i)) (i32.const 0)))
    )
    (local.get $i)
  )

  (func (export "replace") (param $char i32) (param $char2 i32)
    (local $i i32)
    (local $len i32)
    (local.set $len (call $get_len))

    (loop $loop
      (if (i32.eq (i32.load8_u (local.get $i)) (local.get $char))
        (then
          (i32.store8 (local.get $i) (local.get $char2))
        )
      )

      (local.set $i (i32.add (local.get $i) (i32.const 1)))
      (br_if $loop (i32.lt_s (local.get $i) (local.get $len)))
    )
  )
)