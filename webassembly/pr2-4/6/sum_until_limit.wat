(module
  (import "console" "log" (func $log (param i32)))
  (memory $0 1)
  (export "memory" (memory $0))

  (func (export "sumUntilLimit") (param $arr i32) (param $length i32) (result i32)
    (local $sum i32)
    (local $i i32)
    (local $val i32)

    (loop $my_loop
      (local.set $val (i32.load (i32.add (local.get $arr) (i32.mul (local.get $i) (i32.const 4)))))

      (local.set $sum (i32.add (local.get $sum) (local.get $val)))

      (if (i32.gt_s (local.get $sum) (i32.const 100))
        (then
          (local.set $sum (i32.const 100))
        )
      )

      local.get $sum
      call $log

      (local.set $i (i32.add (local.get $i) (i32.const 1)))

      local.get $i
      local.get $length
      i32.lt_s
      br_if $my_loop
    )
    
    local.get $sum
  )
)
