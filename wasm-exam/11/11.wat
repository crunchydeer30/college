(module
  (memory (export "memory") 1)

  (func $strlen (export "strlen") (param $ptr i32) (result i32)
    (local $len i32)

    (loop $loop
      (if (i32.eqz (i32.load8_u (i32.add (local.get $ptr) (local.get $len))))
        (then (return (local.get $len)))
      )
      (local.set $len (i32.add (local.get $len) (i32.const 1)))
      br $loop
    )


    (local.get $len)
  )
)