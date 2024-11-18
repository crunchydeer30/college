(module
  (import "console" "log" (func $log (param i32)))
  (memory (export "memory") 1)
  (data (i32.const 0) "DataToCopy\00")

  (func $get_size (export "get_size") (result i32)
    (local $i i32)
    
    (loop $loop
      (local.set $i (i32.add (local.get $i) (i32.const 1)))
      (br_if $loop (i32.ne (i32.load8_u (local.get $i)) (i32.const 0)))
    )
    (local.get $i)
  )

  (func $copy (export "copy") (param $src i32) (param $dst i32) (result i32)
    (local $i i32)
    (local $len i32)

    (loop $loop
      (i32.store8 (local.get $dst) (i32.load8_u (i32.add (local.get $src) (local.get $i))))
      
      (local.set $dst (i32.add (local.get $dst) (i32.const 1)))
      (local.set $i (i32.add (local.get $i) (i32.const 1)))
      
      (br_if $loop (i32.ne (i32.load8_u (local.get $i)) (i32.const 0)))
    )

    (local.get $dst)
  )
)