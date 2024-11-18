(module
  (import "console" "log" (func $log (param i32)))
  (memory (export "memory") 1)
  (data (i32.const 0) "CopyThis\00")

  (func (export "copy") (param $src i32) (param $dst i32) (param $len i32) (result i32)
    (local $i i32)

    (loop $loop
      (i32.store8 (local.get $dst) (i32.load8_u (i32.add (local.get $src) (local.get $i))))
      (local.set $dst (i32.add (local.get $dst) (i32.const 1)))

      (local.set $i (i32.add (local.get $i) (i32.const 1)))
      (br_if $loop (i32.lt_s (local.get $i) (local.get $len)))
    )

    (local.get $dst)
  )
)