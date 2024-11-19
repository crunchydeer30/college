(module 
  (func $isEven (export "isEven") (param $n i32) (result i32)
    (i32.eq (i32.rem_u (local.get $n) (i32.const 2)) (i32.const 0))
  )
)