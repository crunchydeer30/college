(module
  (func (export "factLoop") (param $n i32) (result i32)
    (local $i i32)
    (local $result i32)

    (local.set  $i (i32.const 1))
    (local.set  $result (i32.const 1))

    local.get $n
    i32.const 1
    i32.add
    local.set $n

    (loop $my_loop
      local.get $result
      local.get $i
      i32.mul
      local.set $result

      local.get $i
      i32.const 1
      i32.add
      local.set $i

      local.get $i
      local.get $n
      i32.lt_s
      br_if $my_loop
    )

    local.get $result
  )

  (func $fact (export "factRecursive") (param $n f64) (result f64)
    local.get $n
    f64.const 1
    f64.lt
    if (result f64)
      f64.const 1
    else
      local.get $n
      local.get $n
      f64.const 1
      f64.sub
      call $fact
      f64.mul
    end
  )
)
