(module
  (func (export "countBits") (param $n i32) (result i32)
    (local $cnt i32)
    (local $bit i32)

    (loop $loop
      (local.set $bit (i32.and (local.get $n) (i32.const 1)))
      (local.set $cnt (i32.add (local.get $cnt) (local.get $bit)))
      (local.set $n (i32.shr_u (local.get $n) (i32.const 1)))
      (br_if $loop (i32.ne (local.get $n) (i32.const 0)))
    )

    (local.get $cnt)
  )
)