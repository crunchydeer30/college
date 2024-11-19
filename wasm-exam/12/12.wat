(module
  (memory (export "memory") 1)

  (func (export "strcpy") (param $src i32) (param $dst i32) (result i32)
    (local $byte i32)

    (loop $loop
      (local.set $byte (i32.load8_u (local.get $src)))
      
      (if (i32.eqz (local.get $byte))
        (then
          (return (local.get $dst))
        )
      )

      (i32.store8 (local.get $dst) (local.get $byte))

      (local.set $src (i32.add (local.get $src) (i32.const 1)))
      (local.set $dst (i32.add (local.get $dst) (i32.const 1)))
      br $loop
    )

    (local.get $dst)
  )
)