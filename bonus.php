<?php
    header("Content-type: text/html; charset=utf-8"); 
    $OPENDID = $_GET[OPENDID];
    function get_rand($proArr) { 
        $result = ''; 

        $proSum = array_sum($proArr); 

        foreach ($proArr as $key => $proCur) { 
          $randNum = mt_rand(1, $proSum); 
          if ($randNum <= $proCur) { 
            $result = $key; 
            break; 
          } else { 
            $proSum -= $proCur; 
          } 
        } 
        unset ($proArr); 
        
        return $result; 
      } 
      $prize_arr = array( 
        '0' => array('id'=>1,'prize'=>'128元现金红包','v'=>12), 
        '1' => array('id'=>2,'prize'=>'68元现金红包','v'=>24), 
        '2' => array('id'=>3,'prize'=>'20元现金红包','v'=>160), 
        '3' => array('id'=>4,'prize'=>'10元现金红包','v'=>380), 
        '4' => array('id'=>5,'prize'=>'5元现金红包','v'=>600), 
        '5' => array('id'=>6,'prize'=>'未中奖','v'=>1000), 
      ); 

      foreach ($prize_arr as $key => $val) { 
        $arr[$val['id']] = $val['v']; 
      } 
       
      $rid = get_rand($arr); //获取奖项id 
       
      $res = $prize_arr[$rid-1]['prize']; 
      echo $res;
?>