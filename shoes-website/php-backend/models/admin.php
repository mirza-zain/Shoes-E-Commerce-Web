<?php 

    include_once '../config/dbconnect.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        $prod_name = $_POST['itemName'];
        $prod_description = $_POST['itemDes'];
        $prod_price = $_POST['itemPrice'];
        $prod_label = $_POST['itemLabel'];
        $prod_stock = $_POST['itemStock'];
        
        $image = '';
        if(isset($_FILES['itemPic']) && $_FILES['itemPic']['error'] === UPLOAD_ERR_OK) {
            $imageTmp = $_FILES['itemPic']['tmp_name'];
            $imageName = basename($_FILES['itemPic']['name']);
            $targetDir = "uploads/";
            if(!is_dir($targetDir)) mkdir($targetDir);
            $targetFile = $targetDir . $imageName;
            move_uploaded_file($imageTmp, $targetFile);
            $image = $targetFile;
        }
    
        $prodAdd = $connect->prepare("INSERT INTO products (prod_name, prod_des, price, prod_label, prod_stock, image) VALUES (?, ?, ?, ?, ?, ?)");
        $prodAdd->bind_param("ssdss", $prod_name, $prod_des, $price, $prod_label, $prod_stock, $image);
    
        if($prodAdd->execute()) {
            echo "<p style='color:green;text-align:center;'>Product added successfully!</p>";
        } else {
            echo "<p style='color:red;text-align:center;'>Error: " . $prodAdd->error . "</p>";
        }
        $prodAdd->close();
    }
?>

<div className='w-full my-10 mx-auto py-3 px-2 rounded-md '>
        <h2 className='text-center text-4xl text-primary-orange mb-6 font-bold'>Admin Dashboard</h2>
        <form className='flex flex-col gap-3 mb-8' action=" " method="POST">
            <label className='font-bold text-primary-dark'>Product ID</label>
            <input type="text" className='p-2 border border-primary-light text-lg rounded-md' name="itemId" placeholder="Enter Product ID" />
            <label className='font-bold text-primary-dark'>Product Name</label>
            <input type="text" className='p-2 border border-primary-light text-lg rounded-md' name="itemName" placeholder="Enter Product Name" />
            <label className='font-bold text-primary-dark'>Product Description</label>
            <input type="text" className='p-2 border border-primary-light text-lg rounded-md' name="itemDes" placeholder="Enter Product Description" />
            <label className='font-bold text-primary-dark'>Product Price</label>
            <input type="text" className='p-2 border border-primary-light text-lg rounded-md' name="itemPrice" placeholder="Enter Product Price" />
            <label className='font-bold text-primary-dark'>Product Label</label>
            <input type="text" className='p-2 border border-primary-light text-lg rounded-md' name="itemLabel" placeholder="Enter Product Tag" />
            <label className='font-bold text-primary-dark'>Product Stock</label>
            <input type="text" className='p-2 border border-primary-light text-lg rounded-md' name="itemStock" placeholder="Enter No of Product Avaliable" />
            <label className='font-bold text-primary-dark'>Add Product Image</label>
            <input type="file" className='p-2 border border-primary-light text-lg rounded-md' name="itemPic" placeholder='Upload File' />
            <input type="submit" className='bg-primary-orange text-white rounded-md py-2.5 text-lg cursor-pointer mt-2 font-extrabold' value="Submit" name="submit" />
        </form>
        <table className='w-full border-collapse mt-4 bg-primary-white overflow-hidden rounded-lg'>
            <thead>
                <tr>
                    <th className="py-2.5 px-2 text-start border border-primary-light bg-primary-orange text-white">
                        ID
                    </th>
                    <th className="py-2.5 px-2 text-start border border-primary-light bg-primary-orange text-white">
                        Name
                    </th>
                    <th className="py-2.5 px-2 text-start border border-primary-light bg-primary-orange text-white">
                        Description
                    </th>
                    <th className="py-2.5 px-2 text-start border border-primary-light bg-primary-orange text-white">
                        Price
                    </th>
                    <th className="py-2.5 px-2 text-start border border-primary-light bg-primary-orange text-white">
                        Label
                    </th>
                    {/* <th className="py-2.5 px-2 text-start border border-primary-light bg-primary-orange text-white">
                        Image
                    </th> */}
                </tr>
            </thead>
            <tbody>
            <?php
                $result = $connect -> query("SELECT id, prod_name, prod_description, prod_price, prod_label, prod_stock FROM products ORDER BY id DESC");
                if($result && $result -> num_rows > 0)
                {
                    while($row = $result -> fetch_assoc())
                    {
                        echo "<tr>";
                            echo '<td className="py-2.5 px-2 text-start border border-primary-light">'. $row['prod_id'] . '</td>';                            
                            echo '<td className="py-2.5 px-2 text-start border border-primary-light">'. $row['prod_name'] . '</td>';
                            echo '<td className="py-2.5 px-2 text-start border border-primary-light">'. $row['prod_description'] . '</td>';
                            echo '<td className="py-2.5 px-2 text-start border border-primary-light">'. $row['prod_price'] . '</td>';
                            echo '<td className="py-2.5 px-2 text-start border border-primary-light">'. $row['prod_label'] . '</td>';
                            echo '<td className="py-2.5 px-2 text-start border border-primary-light">'. $row['prod_stock'] . '</td>';
                        echo "</tr>";
                    }
                }
            ?>
            </tbody>
        </table>
    </div>