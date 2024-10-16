(module
  (func (export "isEven") (param $n i32) (result i32)
    local.get $n
    i32.const 2
    i32.rem_s
    i32.eqz
  )
)