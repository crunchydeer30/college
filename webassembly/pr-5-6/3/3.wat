(module
  (import "console" "log" (func $log (param i32)))
  (memory (export "memory") 1)
  (data (i32.const 0) "\AA\BB\CC\DD")

  (func $get_len (export "get_len") (result i32)
    (local $i i32)

    (loop $loop
      (local.set $i (i32.add (local.get $i) (i32.const 1)))
      (br_if $loop (i32.ne (i32.load8_u (local.get $i)) (i32.const 0)))
    )
    (local.get $i)
  )

  (func (export "sum") (result i32)
    (local $i i32)
    (local $len i32)
    (local $sum i32)
    (local.set $len (call $get_len))

    (loop $loop
      (local.set $sum (i32.add (local.get $sum) (i32.load8_u (local.get $i))))

      (local.set $i (i32.add (local.get $i) (i32.const 1)))
      (br_if $loop (i32.lt_s (local.get $i) (local.get $len)))
    )
    (local.get $sum)
  )
)