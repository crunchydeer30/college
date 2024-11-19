(module 
  (func (export "and") (param $a i32) (param $b i32) (result i32)
    (i32.and (local.get $a) (local.get $b))
  )

  (func (export "or") (param $a i32) (param $b i32) (result i32)
    (i32.or (local.get $a) (local.get $b))
  )

  (func (export "xor") (param $a i32) (param $b i32) (result i32)
    (i32.xor (local.get $a) (local.get $b))
  )

  (func (export "shl") (param $a i32) (param $b i32) (result i32)
    (i32.shl (local.get $a) (local.get $b))
  )

  (func (export "shr") (param $a i32) (param $b i32) (result i32)
    (i32.shr_s (local.get $a) (local.get $b))
  )
)