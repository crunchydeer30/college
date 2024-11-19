(module
  (func $get_low_byte (param $n i32) (result i32)
    local.get $n
    i32.const 255
    i32.and
  )

  (func $get_high_byte (param $n i32) (result i32)
    local.get $n
    i32.const 8
    i32.shr_u
    i32.const 255
    i32.and
  )

  (export "get_low_byte" (func $get_low_byte))
  (export "get_high_byte" (func $get_high_byte))
)