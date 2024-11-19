(module
  (func (export "sum") (param $min i32) (param $max i32) (result i32)
    (local $sum i32)

    (loop $loop
      (local.set $sum (i32.add (local.get $sum) (local.get $min)))
      (local.set $min (i32.add (local.get $min) (i32.const 1)))
      (br_if $loop (i32.le_u (local.get $min) (local.get $max)))
    )

    (local.get $sum)
  )
)