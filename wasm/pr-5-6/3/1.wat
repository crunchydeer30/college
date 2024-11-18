(module
  (memory (export "memory") 1)
  (data (i32.const 0) "\01\02\03\04\05")

  (func (export "get_ptr") (result i32)
    (i32.const 0)
  )

  (func (export "get_len") (result i32)
    (local $i i32)

    (loop $loop
      (local.set $i (i32.add (local.get $i) (i32.const 1)))
      (br_if $loop (i32.ne (i32.load8_u (local.get $i)) (i32.const 0)))
    )
    (local.get $i)
  )
)