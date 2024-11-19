(module
  (memory (export "memory") 1)
  
  (func (export "sum") (param $ptr i32) (param $len i32) (result i32)
    (local $sum i32)
    (local $i i32)

    (loop $loop
      local.get $sum
      call $log
      (local.set $sum (i32.add (local.get $sum) (i32.load8_s (i32.add (local.get $ptr) (local.get $i)))))
      (local.set $i (i32.add (local.get $i) (i32.const 1)))
      (br_if $loop (i32.lt_s (local.get $i) (local.get $len)))
    )

    (local.get $sum)
  )
)