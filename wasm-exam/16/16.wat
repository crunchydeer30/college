(module
  (func (export "strwrite") (param $ptr i32) (param $str i32) (result i32)
    (i32.store (local.get $ptr) (local.get $str))
  )
)