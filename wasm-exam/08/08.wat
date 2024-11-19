(module
  (table 4 funcref)
  (elem (i32.const 0) $add $sub $mul $div)
  
  (func $add (param i32 i32) (result i32)
    (i32.add (local.get 0) (local.get 1))
  )
  
  (func $sub (param i32 i32) (result i32)
    (i32.sub (local.get 0) (local.get 1))
  )

  (func $mul (param i32 i32) (result i32)
    (i32.mul (local.get 0) (local.get 1))
  )

  (func $div (param i32 i32) (result i32)
    (i32.div_s (local.get 0) (local.get 1))
  )


  (export "table" (table 0))
)