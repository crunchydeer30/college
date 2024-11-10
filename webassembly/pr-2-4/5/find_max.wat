(module
  (import "console" "log" (func $log (param i32)))
  (memory $0 1)
  (export "memory" (memory $0))

  (func $find_max (export "findMax") (param $arr i32) (param $length i32) (result i32)
    (local $max i32)
    (local $i i32)
    (local $val i32)

    (local.set $max (i32.load (local.get $arr)))

    (loop $my_loop
      (local.set $val (i32.load (i32.add (local.get $arr) (i32.mul (local.get $i) (i32.const 4)))))
      
      (if (i32.gt_s (local.get $val) (local.get $max))
        (then
          (local.set $max (local.get $val))
        )
      )

      (local.set $i (i32.add (local.get $i) (i32.const 1)))

      local.get $i
      local.get $length
      i32.lt_s
      br_if $my_loop
    )
    
    local.get $max
  )
)
