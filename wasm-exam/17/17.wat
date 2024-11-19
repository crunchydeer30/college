(module
  (func (export "binaryToDecimal") (param $binary i32) (result i32)
    (local $decimal i32)
    (local $bit i32)
    (local $pow i32)
    (local.set $pow (i32.const 1))

    (loop $loop
      (if (i32.eqz (local.get $binary))
        (then (return (local.get $decimal)))
      )

      (local.set $bit (i32.rem_s (local.get $binary) (i32.const 10)))
      (local.set $decimal (i32.add (local.get $decimal) (i32.mul (local.get $bit) (local.get $pow))))
      (local.set $binary (i32.div_s (local.get $binary) (i32.const 10)))
      (local.set $pow (i32.mul (local.get $pow) (i32.const 2)))
      br $loop
    )

    (local.get $decimal)
  )
)