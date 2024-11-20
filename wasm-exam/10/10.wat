(module
  (import "console" "log" (func $log (param i32)))
  (memory (export "memory") 1)
  (func (export "decimalToBinary") (param $decimal i32) (result i32)
    (local $ptr i32)
    (local $bit i32)
    (local.set $ptr (i32.const 0xFFFF))

    (block $exit
      (loop $loop
        (br_if $exit (i32.eqz (local.get $decimal)))
        (local.set $bit (i32.and (local.get $decimal) (i32.const 1)))
        (i32.store8 (local.get $ptr) (local.get $bit))
        (local.set $ptr (i32.add (local.get $ptr) (i32.const -1)))
        (local.set $decimal (i32.shr_u (local.get $decimal) (i32.const 1)))
        br $loop
      )
    )
    (local.set $ptr (i32.sub (local.get $ptr) (i32.const -1)))
    (local.get $ptr)
  )
)