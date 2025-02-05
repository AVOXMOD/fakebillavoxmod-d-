<?php $options_header=['title' => 'Tạo fake bill Vietcombank chuyển khoản','og:image'=> 'https://i.imgur.com/P3u7Mzg.png'];?>
<?php require_once($_SERVER['DOCUMENT_ROOT'].'/include/head.php'); ?>
<?php require_once($_SERVER['DOCUMENT_ROOT'].'/include/nav.php'); ?>
<div class="content-wrapper">
    <!-- Content -->
    <div class="flex-grow-1 container-p-y container-fluid">
        <h4 class="py-3 breadcrumb-wrapper mb-4">
            <span class="text-muted fw-light">Fake Bill Chuyển Khoản /</span> Vietcombank Mới
        </h4>
        <div class="row">
            <div class="col-md-9">
                <form class="hk-vietcombank-new hk-refresh-form">
                    <div class="card mb-4">
                        <h5 class="card-header"><i class="ri-bank-fill me-2"></i>Tạo Bill Vietcombank</h5>
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="stk" data-limit-text="17" class="form-label">Số Tài Khoản Người Nhận</label>
                                <input type="text" data-td-msg="Số tài khoản phải là một con số!"
                                    class="form-control td-format-number" name="stk"
                                    placeholder="Ví dụ: 10<?=random_int(10000000, 999999999)?>" required>
                            </div>
                            <div class="mb-3">
                                <label for="tennguoinhan" data-limit-text="30" class="form-label">Tên Người Nhận</label>
                                <input type="text" class="form-control td-format-text" name="tennguoinhan"
                                    placeholder="VUONG THANH DIEU" required>
                            </div>
                            <div class="mb-3">
                                <label for="sotienchuyen" data-limit-text="20" class="form-label">Số Tiền Chuyển</label>
                                <input type="text" data-td-msg="Số tiền chuyển phải là một con số!"
                                    class="form-control td-format-money" name="sotienchuyen"
                                    placeholder="Ví dụ: 100,000,000" required>
                            </div>
                            <div class="mb-3">
                                <label for="kieuchuyen" class="form-label">Kiểu Chuyển</label>
                                <select class="form-select" name="kieuchuyen" id="kieuchuyen" aria-label="Kiểu Chuyển" required>
                                    <option value="ngoaibank">Chuyển Ngoài VCB</option>
                                    <option value="trongbank">Chuyển Trong VCB</option>
                                </select>
                            </div>
                            <div class="mb-3" id="nganhangnhan">
                                <label for="nganhangnhan" class="form-label">Ngân Hàng Nhận</label>
                                <select class="form-select" name="nganhangnhan" aria-label="Chọn Ngân Hàng" required>
                                    <option value="vietinbank">Vietinbank (CTG)</option>
                                    <option value="techcombank">Techcombank (TCB)</option>
                                    <option value="acbbank">Acb Bank (ACB)</option>
                                    <option value="agribank">Agribank (ARB)</option>
                                    <option value="bidv">BIDV (BIDV)</option>
                                    <option value="msb">MSB (MSB)</option>
                                    <option value="sacombank">Sacombank (STB)</option>
                                    <option value="mbbank">Mb Bank (MB)</option>
                                    <option value="namabank">Nam Á Bank (NAB)</option>
                                    <option value="ocb">OCB (OCB)</option>
                                    <option value="tpbank">TP Bank (TPB)</option>
                                    <option value="vpbank">VP Bank (VPB)</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="thoigianchuyen" data-limit-text="27" class="form-label">Thời Gian
                                    Chuyển</label>
                                <input type="text" class="form-control" name="thoigianchuyen"
                                    value="<?=(new TimeFormatter())->ThoiGian()?>"
                                    placeholder="Ví dụ: <?=(new TimeFormatter())->ThoiGian()?>" required>
                            </div>
                            <div class="mb-3">
                                <label for="thoigiantrendt" data-limit-text="5" class="form-label">Thời Gian Trên
                                    ĐT</label>
                                <input type="text" class="form-control" name="thoigiantrendt" value="<?= date('H:i') ?>"
                                    placeholder="Ví dụ: 00:00" required>
                            </div>
                            <div class="mb-3">
                                <label for="magiaodich" data-limit-text="15" class="form-label">Mã Giao Dịch</label>
                                <input type="text" class="form-control" name="magiaodich"
                                    value="<?=random_int(100000000, 9999999999)?>"
                                    placeholder="Ví dụ: <?=random_int(100000000, 9999999999)?>" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" data-limit-text="30" or="noidungchuyen">Nội Dung
                                    Chuyển</label>
                                <textarea class="form-control" name="noidungchuyen" rows="3" placeholder="Ví dụ: VUONG THANH DIEU
chuyen tien" required>NGUYEN VAN A
chuyen tien</textarea>
                            </div>
                            <div class="mb-3">
                            <?php include_once($_SERVER['DOCUMENT_ROOT'].'/function/insert/dynamics/island.php');?>
                            <div class="d-block d-md-none mt-2"></div>
                            <?php include_once($_SERVER['DOCUMENT_ROOT'].'/function/insert/pin/dark.php');?>
                            </div>
                            <div class="row">
                                <div class="col-12 text-center">
                                    <input type="hidden" name="action" value="fakebill-vietcombank-new">
                                    <button type="submit" class="btn btn-primary"><i
                                            class="ri-checkbox-circle-line me-2"></i>Tạo Bill Ngay</button>&ensp;
                                    <button type="button" class="btn btn-danger clear-form"><i
                                            class="ri-refresh-line me-2"></i>Làm Mới</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <!-- View Bill Form -->
            <div class="col-md-3 d-none d-md-block">
                <div class="kq-bill text-center">
                    <img src="/<?=__IMG__?>/demo/vietcombank_moi.png" alt="Vietcombank" class="img-fluid">
                </div>
            </div>
        </div>
    </div>
</div>
<!-- / Content -->
<?php require_once($_SERVER['DOCUMENT_ROOT'].'/include/foot.php');?>