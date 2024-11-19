(module
  (func $max (export "max") (param i32 i32) (result i32)
      (if (i32.lt_s (local.get 0) (local.get 1))
        (then (return (local.get 1)))
      )
      (local.get 0)
  )
)