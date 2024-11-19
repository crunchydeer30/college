(module
  (func $fact (export "fact") (param $n i32) (result i32)
    (local $i i32)
    (local $result i32)
    (local.set $i (i32.const 1))
    (local.set $result (i32.const 1))

    (loop $loop
      (local.set $result (i32.mul (local.get $result) (local.get $i)))
      (local.set $i (i32.add (local.get $i) (i32.const 1)))
      (br_if $loop (i32.ne (local.get $i) (i32.add (i32.const 1) (local.get $n))))
    )

    (local.get $result)
  )
)