(module
  (func (export "isEven") (param $n i32) (result i32)
    (i32.eqz (i32.and (local.get $n) (i32.const 1)))
  )
)